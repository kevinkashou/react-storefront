/**
 * @license
 * Copyright © 2017-2018 Moov Corporation.  All rights reserved.
 */
import React from 'react'
import { mount } from 'enzyme'
import ImageSwitcher from '../src/ImageSwitcher'
import Provider from './TestProvider'
import AppModelBase from '../src/model/AppModelBase'
import AmpState from '../src/amp/AmpState'
import TestProvider from './TestProvider'

describe('ImageSwitcher', () => {
  it('only shows images by default, no bells and whistles', () => {
    expect(
      mount(
        <Provider>
          <ImageSwitcher images={['/a.jpg', '/b.jpg', '/c.jpg']} />
        </Provider>
      )
    ).toMatchSnapshot()
  })

  it('should render thumbnails', () => {
    expect(
      mount(
        <Provider>
          <ImageSwitcher
            images={['/a.jpg', '/b.jpg', '/c.jpg']}
            thumbnails={['/at.jpg', '/bt.jpg', '/ct.jpg']}
          />
        </Provider>
      )
    ).toMatchSnapshot()
  })

  it('should render arrows', () => {
    expect(
      mount(
        <Provider>
          <ImageSwitcher images={['/a.jpg', '/b.jpg', '/c.jpg']} arrows />
        </Provider>
      )
    ).toMatchSnapshot()
  })

  it('should render indicator dots', () => {
    expect(
      mount(
        <Provider>
          <ImageSwitcher images={['/a.jpg', '/b.jpg', '/c.jpg']} showIndicators />
        </Provider>
      )
    ).toMatchSnapshot()
  })

  it('should render AmpImageSwitcher when amp=true', () => {
    expect(
      mount(
        <Provider app={AppModelBase.create({ amp: true })} nextId={() => '1'}>
          <AmpState>
            <ImageSwitcher images={['/a.jpg', '/b.jpg', '/c.jpg']} />
          </AmpState>
        </Provider>
      )
    ).toMatchSnapshot()
  })

  it('should accept image objects and use given props', () => {
    const wrapper = mount(
      <Provider>
        <ImageSwitcher images={[{ src: 'test.jpg', alt: 'test' }]} />
      </Provider>
    )
    expect(
      wrapper
        .find('img')
        .first()
        .prop('alt')
    ).toBe('test')
  })

  it('should accept image objects and use given props in AMP', () => {
    const wrapper = mount(
      <Provider app={AppModelBase.create({ amp: true })} nextId={() => '1'}>
        <AmpState>
          <ImageSwitcher images={[{ src: 'test.jpg', alt: 'test' }]} />
        </AmpState>
      </Provider>
    )
    expect(
      wrapper
        .find('amp-img')
        .first()
        .prop('alt')
    ).toBe('test')
  })

  it('should reset the image when the product changes', () => {
    function Test({ product }) {
      return (
        <TestProvider>
          <ImageSwitcher product={product} selectedIndex={1} />
        </TestProvider>
      )
    }

    const wrapper = mount(
      <Test
        product={{
          id: '1',
          images: [
            'http://localhost/1/1.png',
            'http://localhost/1/2.png',
            'http://localhost/1/3.png'
          ]
        }}
      />
    )

    expect(wrapper.find('ReactSwipableView').prop('index')).toBe(1)

    wrapper.setProps({
      product: {
        id: '2',
        images: ['http://localhost/2/1.png', 'http://localhost/2/2.png', 'http://localhost/2/3.png']
      }
    })

    expect(wrapper.find('ReactSwipableView').prop('index')).toBe(0)
  })
})
