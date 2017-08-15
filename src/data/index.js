
import Cookie from 'js-cookie';
export const setData=(key,values)=>{
    Cookie.set(key,values);
}


export const getData = (key)=>{
    return Cookie.get(key);
}

export const delData =(key)=>{
    Cookie.remove(key);
}


export const userInfo = ()=>{
    let info = getData('userInfo');
    return JSON.parse(info);
}