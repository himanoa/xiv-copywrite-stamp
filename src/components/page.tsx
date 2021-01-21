import React from 'react'
import { Header } from './header'
import { Content } from './content'
import { Footer } from './footer'
import styled from 'styled-components'

const PageInner = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  header {
    margin-bottom: 4px;
  }
  section {
    height: 100%;
    margin-top: 0;
  }

  footer {
    margin-top: auto;
  }
`
export const Page = () => {
  return (
    <PageInner>
      <header>
        <Header></Header>
      </header>
      <section>
        <Content></Content>
      </section>
      <footer>
        <Footer></Footer>
      </footer>
    </PageInner>
  )
}
