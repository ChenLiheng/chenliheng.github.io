/*
 * @Author: 陈立恒  chenliheng@youlai.cn
 * @Date: 2023-01-29 11:51:47
 * @LastEditors: 陈立恒  chenliheng@youlai.cn
 * @LastEditTime: 2023-01-29 14:26:30
 * @Description: 
 */
import React, { type FC } from 'react';
import './index.less';

const Card: FC = (props) => {
  return (
    <div className='card'>
      {props?.children}
    </div>
  )
}
export default Card;