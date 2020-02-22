import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

var routes=[
    {path:"/1",component: () => import(`@/components/CustomerMgr`)},
    {path:"/2",component: () => import(`@/components/ProductMgr`)},
    {path:"/3",component: () => import(`@/components/MessageMgr`)},
    {path:"/4",component: () => import(`@/components/OrderMgr`)},
    {path:"/5",component: () => import(`@/components/HistoryOrder`)},
    {path:"/6",component: () => import(`@/components/UserMgr`)},
]
export default new VueRouter({ routes })