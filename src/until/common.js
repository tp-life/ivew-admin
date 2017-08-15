import iview from 'iview';
import rules from '../../config/menu';
import * as ac from '../data';
//render 版的查看
export const newShow = (auth,h, cb,...args) => {
    if(!checkAuth(auth)){
        return '';
    }
    return h('Tooltip', {
        props: {
            content: '查看'
        }
    }, [
            h('Button', {
                props: { size: 'small' },
                style:{marginLeft:'8px'},
                on: {
                    'click':()=>{
                        cb(...args)
                    }
                }
            }, [
                    h('Icon', { props: { type: 'information-circled',color:'green' } })
                ])
        ]);
}

/**
 * 编辑
 * @param {*} h 
 * @param {*} cb 
 * @param {*} args 
 */
export const newEdit =(auth,h,cb,...args)=>{
    if(!checkAuth(auth)){
        return '';
    }
    return h('Tooltip', {
        props: {
            content: '编辑',
            
        }
    }, [
            h('Button', {
                props: { size: 'small' },
                style:{marginLeft:'8px'},
                on: {
                    'click':()=>{
                        cb(...args)
                    }
                }
            }, [
                    h('Icon', { props: { type: 'edit',color:'#5cadff' } })
                ])
        ]);
}

/**
 * 禁用
 * @param {*} h 
 * @param {*} cb 
 * @param {*} args 
 */
export const newStatR=(auth,h,cb,...args)=>{
    if(!checkAuth(auth)){
        return '';
    }
    return h('Tooltip', {
        props: {
            content: '禁用',
            
        }
    }, [
            h('Button', {
                props: { size: 'small' },
                style:{marginLeft:'8px'},
                on: {
                    'click':()=>{
                        cb(...args)
                    }
                }
            }, [
                    h('Icon', { props: { type: 'ios-locked-outline' ,color:'#ff9900'} })
                ])
        ]);
}

/**
 * 启用
 * @param {*} h 
 * @param {*} cb 
 * @param {*} args 
 */
export const newStatO=(auth,h,cb,...args)=>{
    if(!checkAuth(auth)){
        return '';
    }
    return h('Tooltip', {
        props: {
            content: '启用',
            
        }
    }, [
            h('Button', {
                props: { size: 'small' },
                style:{marginLeft:'8px'},
                on: {
                    'click':()=>{
                        cb(...args)
                    }
                }
            }, [
                    h('Icon', { props: { type: 'ios-unlocked',color:'#00cc66' } })
                ])
        ]);
}

/**
 * 删除
 * @param {*} h 
 * @param {*} cb 
 * @param {*} args 
 */
export const newDel=(auth,h,cb,args)=>{
    if(!checkAuth(auth)){
        return '';
    }
    return h('Tooltip', {
        props: {
            content: '删除',
            
        }
    }, [
            h('Button', {
                props: { size: 'small' },
                style:{marginLeft:'8px'},
                on: {
                    'click':()=>{
                        cb(args)
                    }
                }
            }, [
                    h('Icon', { props: { type: 'trash-a',color:'#ff3300' } })
                ])
        ]);
}
//下架
export const GoodsR=(auth,h,cb,args)=>{
    if(!checkAuth(auth)){
        return '';
    }
    return h('Tooltip', {
        props: {
            content: '下架',
            
        }
    }, [
            h('Button', {
                props: { size: 'small' },
                style:{marginLeft:'8px'},
                on: {
                    'click':()=>{
                        cb(args)
                    }
                }
            }, [
                    h('Icon', { props: { type: 'thumbsdown',color:'#464c5b' } })
                ])
        ]);
}
//上架
export const GoodsS=(auth,h,cb,args)=>{
    if(!checkAuth(auth)){
        return '';
    }
    return h('Tooltip', {
        props: {
            content: '上架',
            
        }
    }, [
            h('Button', {
                props: { size: 'small' },
                style:{marginLeft:'8px'},
                on: {
                    'click':()=>{
                        cb(args)
                    }
                }
            }, [
                    h('Icon', { props: { type: 'thumbsup',color:'#00cc66' } })
                ])
        ]);
}

//执行删除操作确认框
export const handleDel = (ok, title, content, cancel) => {
    content = content || '该操作不可逆，您确定要删除当前数据吗？';
    title = title || '删除确认';
    baseHandle(title, content, ok, cancel);
}

//更改状态
export const handleSta = (ok, title, content, cancel) => {
    content = content || '您确定要更改当前数据状态吗？';
    title = title || '状态更改确认';
    baseHandle(title, content, ok, cancel);
}

//提示并刷新页面
export const notice = (title, cb) => {
    iview.Notice.success({
        title: title,
        duration: 1.5,
        onClose: () => {
            if (typeof cb === 'function') {
                cb();
            }
        }
    });
}

//基础操纵
function baseHandle(title, content, ok, cancel) {
    title = title || '操作确认框';
    content = content || '<p>您确定要进行该项操作吗？</p>'
    let config = {
        title: title,
        content: content,
        okText: '确定',
        cancelText: '取消'
    }

    if (typeof ok === 'function') {
        config.onOk = ok;
    }
    if (typeof cancel === 'function') {
        config.onCancel = cancel;
    }

    iview.Modal.confirm(config);
}



/**
 * 检查是否拥有权限
 * @param {*} auth 
 */
export function checkAuth(auth){
    if(auth == '*') return true;
    if(!auth){
        return false;
    }
    let hasAuth = ac.getData('auth');
    if(!hasAuth){
        return false;
    }
    let rule = rules[auth];
    let q = JSON.parse(hasAuth);
    return q.indexOf(rule) != -1;
}

