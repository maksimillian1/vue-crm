import firebase from 'firebase'

export default {
    actions: {
        async login({dispatch, commit}, {email, password}) {
            try {
                await firebase.auth().signInWithEmailAndPassword(email, password)
            } catch (error) {
                commit('setError', error)
                throw error
            }
        },
        async register({dispatch, commit}, {name, email, password}) {
            try {
                await firebase.auth().createUserWithEmailAndPassword(email, password)
                let uid = await dispatch('getUid');
                await firebase.database().ref(`/users/${uid}/info`).set({
                    bill: 10000,
                    name
                })
            } catch (error) {
                console.log('testtests');
                commit('setError', error)
                throw error
            }
        },
        async getUid() {
            let user = firebase.auth().currentUser
            return user ? user.uid : null
        },
        async logout({commit}) {
            await firebase.auth().signOut()
            commit('clearInfo')
        }
    }
}