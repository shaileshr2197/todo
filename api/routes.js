const routes = [
    {
        path:'/login',
        module:require('./module/user')
    },
    {
        path:'/task',
        module:require('./module/task')
    }
]

module.exports = routes;