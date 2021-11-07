import Vue from "vue";
import Vuex from "vuex";
import companiesService from "../services/companies-service"
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    companies: null,
    stations: null,
    station: null,
    filterBy: null,
  },
  mutations: {
    SET_COMPANIES(state, { companies }) {
      state.companies = companies
    },
    SET_STATIONS(state, { stations }) {
      state.stations = stations
    },
    SET_FILTER(state, { filterBy }) {
      state.filterBy = filterBy
    },
    SET_STATION(state, { stationToShow }) {
      state.station = stationToShow
    }
  },
  actions: {
    // --- LOAD COMPANY'S NAMES ---
    async loadCompanies(context) {
      try {
        // If Companies In Store Return
        if (this.state.companies && this.state.companies.length > 0) return
        // Else, Bring Them From Server
        const companies = await companiesService.query()
        // Commit The Companies To State
        context.commit({ type: 'SET_COMPANIES', companies })
      } catch (err) {
        console.log('Had issues:', err);
      }
    },
    // --- LOAD COMPANY STATIONS FROM SERVER ---
    async loadStations(context, { data }) {
      try {
        const stations = await companiesService.update({company: data})
        // Commit The Stations To State
        context.commit({ type: 'SET_STATIONS', stations })
      } catch (err) {
        console.log('Had issues:', err);
      }
    },
    // --- LOAD STATION TO STORE, IF IT'S THE FIRST ENTRY TO THE APP LOAD ALL STATIONS FIRST ---
    async loadStation(context, { data }) {
      try {
        // If There Is No Stations In Store, Load relevant Stations
        if (!this.state.stations) await this.dispatch({type:'loadStations', data: data.company})
        // Find Specific Station By Station Id
        const stationToShow = this.state.stations.find(currStation => currStation.attributes.UniqueId === data.stationId)
        // Commit The Station To State
        context.commit({ type: 'SET_STATION', stationToShow })
      } catch (err) {
        console.log(err);
      }
    }

  },
  getters: {
    // --- GET COMPANIES NAMES --- 
    getCompanies(state) {
      return state.companies
    },
    // --- GET STATIONS ACCORDING TO FILTER --- 
    getStations(state) {
      const { stations, filterBy } = state;
      if (!filterBy || filterBy.name === 'none') return stations;
      const regex = new RegExp(state.filterBy.str, 'i');
      const stationsToShow = stations.filter(station => regex.test(station.attributes[filterBy.name]));
      return stationsToShow
    },
    // --- GET A SINGLE STATION ---
    getStation(state) {
      return state.station
    }
  }
});

