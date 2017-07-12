import axios from 'axios';

export const Store = {

  datas: {
    searchKeyword: '',
    results: [],
    favs: [],
    newFav: {},
    num_emails: 0
  },

  searchData() {
    console.log(this.datas.searchKeyword);
    if (this.datas.searchKeyword.length > 1) {
      axios.get(`http://localhost:3000/search/${this.datas.searchKeyword}`).then((res) => {
        this.datas.results = res.data;
      })
    } else {
      console.log("Esperando keyword");
    };
  }

}
