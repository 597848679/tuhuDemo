import React from 'react'
export const ctx = React.createContext('我爱法轮大法');
export const { Provider, Consumer } = ctx
export default ctx;
export const themes={
    light:'black',
    dark:'blue'
}