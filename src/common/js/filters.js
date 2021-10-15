let numberKibt = value => {
    return parseFloat(value).toLocaleString()
}

let MoneyFormat = value => {
    if (value) {
        let str = value.toString();
        //获取英文，以空格分组把字符串转为数组，遍历每一项，第一项转为大写字母
        let newArr = str.split(" ").map(ele => {
            console.log(ele.slice(1))
            return ele.charAt(0).toUpperCase() + ele.slice(1)
        });
        return newArr.join(" ")
    }

}

let timeFilter = function (value) {
    return value + "22"
}

export default {
    MoneyFormat,
    timeFilter,
    numberKibt
}