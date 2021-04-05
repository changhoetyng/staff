import React from 'react';
import {configure,shallow} from 'enzyme'


// Import Page
import NotAuthorized from '../component/NotAuthorized';
import NotFound from '../component/NotFound'

describe("Render Error Page" , () => {
    test("Render not authorized page", () => {
        const wrapper = shallow(<NotAuthorized />)
        expect(wrapper.find("h1").text()).toContain("400 You are not authorized")
    })

    test("Render not found page", () => {
        const wrapper = shallow(<NotFound />)
        expect(wrapper.find("h1").text()).toContain("404 Page Not Found")
    })
})
