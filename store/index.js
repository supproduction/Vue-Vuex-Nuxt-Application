import Vuex from 'vuex';
import axios from 'axios';

const removeHostname = obj => `/${obj.split('/').slice(3).join('/').replace(/\/$/, '')}`;

const createStore = () => {
  return new Vuex.Store({
    state: {
      artworksItems: [],
      dataFilters: [],
      dataItems: [],
      homePage: [],
      contactsInfo: [],
      artwork: [],
      rss: [],
      preloader: false,
      isMobile: true
    },
    actions: {
      async getMenu({commit}) {
        let data = await axios.get('http://amma-test.bigdropinc.net/wp-json/wp-api-menus/v2/menus/18');

        let menuItems = data.data.items;

        commit('addData', menuItems);
        commit('removeUnnecessaryFields');
        commit('changeLinks');
        commit('setMenuActive');
      },
      async getFilters({commit}) {
        let dataFile = await axios.get('http://amma-test.bigdropinc.net/wp-json/wp/v2/artworks-settings');

        let filtersData = dataFile.data;
        commit('addFilters', filtersData);
        commit('changFiltersList');
      },
      async getArtworks({commit}, props) {
        props = props === undefined ? $nuxt.$route.query : props;
        let link = 'http://amma-test.bigdropinc.net/wp-json/wp/v2/artworks?_embed';
        let filters = '';
        for (let item in props) {
          if (item !== 'per_page' && item !== 'page') {
            let middle = item === 'acquisition' ? 'new-acquisition' : item;
            filters = `${filters}&filter[${middle}]=${props[item]}`;
          } else {
            filters = `${filters}&${item}=${props[item]}`;
          }
        }
        let params = link+filters;
        let artFile = await axios.get(params);

        commit('removeUnnecessaryFieldsArt', artFile);
        commit('addArtworks', {data: artFile.data, headers: artFile.headers});
      },
      async getHomepage({commit}) {
        let data = await axios.get('http://amma-test.bigdropinc.net/wp-json/wp/v2/pages/394');

        let dataList = data.data.acf;
        function linkParsing(props) {
          props = props.map(subitem => {
            subitem.link = removeHostname(subitem.link);
            return subitem;
          });
        }
        linkParsing(dataList['home_collection_artworks']);
        linkParsing(dataList['home_exhibitions']);
        linkParsing(dataList['home_artists']['first_letters']);

        commit('addHomePage', dataList);
      },
      async getContactsInfo({commit}) {
        let data = await axios.get('http://amma-test.bigdropinc.net/wp-json/wp/v2/pages/6');

        let dataList = data.data.acf;

        commit('addContactsInfo', dataList);
        commit('removeUnnecessaryFieldsContacts', dataList);
      },
      async getArtwork({commit}, props) {
        props = props === undefined ? $nuxt.$route.params.slug : props;
        let data = await axios.get(`http://amma-test.bigdropinc.net/wp-json/wp/v2/artworks/?_embed&filter%5Bname%5D=${props}`);

        let artworkData = data.data[0];

        commit('removeUnnecessaryFieldsArtwork', artworkData);
      },
      async getRssNews({commit}) {
        let rssNews = await axios.get('https://www.theguardian.com/artanddesign/art/rss');
        let Items = rssNews.data;
        let newObj = {};

        $(Items).find('item').each(function(index, item) {
          newObj[index] = {};
          let title = $(this).find('title').text();
          let link = $(this).find('guid').text();
          let month = $(this).find('pubDate').text().split(', ')[1].split(' ')[1];
          let day = $(this).find('pubDate').text().split(', ')[1].split(' ')[0];
          newObj[index].title = title;
          newObj[index].link = link;
          newObj[index].day = day;
          newObj[index].month = month;

        });
        commit('addRss', newObj);
      }
    },
    mutations: {
      addData (state, payload) {
        state.dataItems = payload;
      },
      addRss (state, payload) {
        state.rss = payload;
      },
      addFilters (state, payload) {
        state.dataFilters = payload;
      },
      addArtworks (state, payload) {
        state.artworksItems = payload;
      },
      addHomePage (state, payload) {
        state.homePage = payload;
      },
      addArtwork (state, payload) {
        state.artwork = payload;
      },
      addContactsInfo (state, payload) {
        state.contactsInfo = payload;
      },
      removeUnnecessaryFields (state) {
        state.dataItems = state.dataItems.map(item => {
          let childs = item.children;
          return {
            id: item.id,
            classes: item.classes,
            url: item.url,
            title: item.title,
            active: item.active,
            expanded: childs !== undefined ? false : undefined,
            children: childs === undefined ? false :
              childs.map(subitem => {
                return {
                  id: subitem.id,
                  classes: subitem.classes,
                  url: subitem.url,
                  title: subitem.title,
                  parent: subitem.parent,
                  active: subitem.active
                }
              })
          };
        });
      },
      changeLinks (state) {
        state.dataItems = state.dataItems.map(item => {
          let children = item.children;
          item.url = removeHostname(item.url);
          if (children) {
            children.map(subitem => {
              subitem.url = removeHostname(subitem.url);
            });
          }
          return item;
        });
      },
      setMenuActive (state, path) {
        let pathFull = path !== undefined ? path : $nuxt.$route.path;
        let arrItems = state.dataItems;
        let parentId;
        let pathName = `/${pathFull.split('/')[1]}`;

        arrItems.forEach(item => {
          item.active = false;
          if(item.children) {
            item.children.forEach(subitem => {
              subitem.active = false;
              if (pathName === subitem.url) {
                parentId = subitem.parent;
              }
              subitem.active = (pathName === subitem.url);
            });
            item.active = (parentId === item.id);
          } else {
            item.active = (pathName === item.url);
          }
        });
      },
      removeUnnecessaryFieldsArt (state, payload) {
        payload.data = payload.data.map(item => {
          return {
            id: item.id,
            link: removeHostname(item.link),
            artist: item['acf']['artwork_artist_label'],
            title: item['title']['rendered'],
            year: item['acf']['artwork_year'],
            category: item['artwork-types'].length > 0 ? item['_embedded']['wp:term'][0][0].name : 'no category',
            image: item.featured_media > 0 ? item['_embedded']['wp:featuredmedia'][0]['media_details']['sizes']['large'].source_url : 'http://static1.squarespace.com/static/561099b6e4b0e1ea752d4131/t/58b703f21b631b3f18acb64b/1488389106882/LI-Logo-whiteonblack.png?format=1000w',
          }
        });
        for (let item in payload.headers) {
          if(item !== 'x-wp-total' && item !== 'x-wp-totalpages') {
            delete payload.headers[item];
          }
        }
      },
      changFiltersList (state) {
        function replaceObj (obj, type) {
          let newObj = {};
          let sortingObj = obj[type];
          for (let i = 0; i<sortingObj.length; i++) {
            newObj[sortingObj[i]] = sortingObj[i];
          }
          delete obj[type];
          obj[type] = newObj;
        }

        replaceObj(state.dataFilters, 'artwork_year');
        replaceObj(state.dataFilters, 'per_page');
        state.dataFilters['artwork_year']['all'] = 'All';
      },
      removeUnnecessaryFieldsContacts (state, payload) {
        let newObj = {};
        let objSize = Object.keys(payload).length;
        for (let i = 0; i < objSize; i++) {
          newObj['location'] = payload['contact_office_location'];
          newObj['addressText'] = payload['contact_description_before_address'];
          newObj['formText'] = payload['contact_description_before_form'];
          newObj['email'] = payload['contact_email'];
          newObj['fax'] = payload['contact_fax'];
          newObj['address'] = payload['contact_office_address'];
          newObj['phone'] = payload['contact_phone'];
        }
        state.contactsInfo = newObj;
      },
      isMobileTest(state) {
        if (!("ontouchstart" in document.documentElement)) {
          state.isMobile = false;
        }
      },
      removeUnnecessaryFieldsArtwork (state, payload) {
        let newObj = {};
        let objSize = Object.keys(payload).length;
        for (let i = 0; i < objSize; i++) {
          newObj['title'] = payload['title']['rendered'];
          newObj['gallery'] = payload['acf']['artwork_gallery'].map(item => {
            return {
              url: item['sizes']['large'],
              small: item['sizes']['thumbnail']
            }
          });
          newObj['descr'] = {};
          newObj['descr']['Artist'] = payload['acf']['artwork_artist_label'];
          if (payload['acf']['artwork_title'].length > 0) newObj['descr']['Title'] = payload['acf']['artwork_title'];
          newObj['descr']['Year'] = payload['acf']['artwork_year'];
          newObj['descr']['Medium'] = payload['acf']['artwork_medium'];
          newObj['descr']['Dimensions'] = payload['acf']['artwork_dimensions'];
        }
        state.artwork = newObj;
      }
    },
    getters: {
      getHeadingData: (state) => (path) => {
          if(state.dataItems !== 0) {
            let subitemsArr = state.dataItems.filter(item => {
              let childs = item.children;
              let submenuFlag = false;
              if(childs) {
                childs.map(subitem => {
                  if (subitem.url === path) {
                    submenuFlag = !submenuFlag;
                  }
                });
                if(submenuFlag) {
                  submenuFlag = !submenuFlag;
                  return item;
                }
              }
            });
            return subitemsArr[0]
          }
      }
    }
  })
};
export default createStore
