require('../styles/index.less')
import {data} from './data.es'
import('./async.es').then(function(res) {
    res.default();
})
console.log(data)