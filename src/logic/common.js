export var setCommon = config => {

    sessionStorage.setItem('TOKEN', JSON.stringify(config));
}

export var getCommon = () => {
    var config = sessionStorage.getItem('TOKEN');
    if (typeof config === "object") {
        return config;
    } else if (typeof config === 'string'&& config =='undefined') {
        config = null;
    }
    return JSON.parse(config);

}
export var clear = () => {
    sessionStorage.removeItem('TOKEN');
}
