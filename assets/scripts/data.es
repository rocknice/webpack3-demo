const m = new Map();
m.set('data', 'Index init')
export const test = function () {
    console.log('test treeshaking');
}
export const data = m.get('data');

if(false !== false) {
    console.log(1)
}