import firebase from 'firebase'

export default {
    state: {
        info: {}
    },
    mutations: {
        setInfo(state, info) {
            state.info = info
        },
        clearInfo(state) {
            state.info = {}
        }
    },
    actions: {
        async fetchInfo({dispatch, commit}) {
            try {
                let userId = await dispatch('getUid')
                console.log(userId);
                const info = (await firebase.database().ref(`/users/${userId}/info`).once('value')).val()
                console.log({tsdf:info});

                commit('setInfo', info)
            } catch (error) {}
        }
    },
    
    getters: {
        userInfo: s => s.info
    }
}