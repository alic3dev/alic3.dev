'use client'

import React from 'react'

import styles from './Header.module.scss'

import NavigationHeader from '@/components/NavigationHeader'
import Title from '@/components/Title'

export const Header: React.FC = () => (
  <div className={styles.header}>
    <Title />
    <NavigationHeader />
  </div>
)

export default Header
