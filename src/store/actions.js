import * as types from './mutation-types';
//路径面包屑
export const actbreadcrumbions=({commit},crumb)=>{
        commit(types.BREADCRUMB,crumb);
    }



