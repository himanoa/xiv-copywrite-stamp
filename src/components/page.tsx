import React from 'react'
import { Header } from './header'
import { Content } from './content'
import { Footer } from './footer'
import styled from 'styled-components'

const PageInner = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  section {
    height: 100%;
    margin-top: auto;
  }

  footer {
    margin-top: auto;
  }
`
export const Page = () => {
  return (
    <PageInner>
      <Header></Header>
      <section>
        <Content></Content>
      </section>
      <footer>
        <Footer></Footer>
      </footer>
    </PageInner>
  )
}
