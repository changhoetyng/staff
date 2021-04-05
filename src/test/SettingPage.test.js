import React from "react";
import { configure, shallow } from "enzyme";

// Import Page
import Settings from "../component/Settings";

describe("Setting Page", () => {
  const wrapper = shallow(<Settings />);

  test("change password button should contain word \"Change Password\"", () => {
    const changePassword = wrapper.find("#changePassword");
    expect(changePassword.text()).toBe("Change Password");
  });

  test("change password button should activate modal", () => {
    const changePassword = wrapper.find("#changePassword");
    expect(wrapper.state('isModal')).toBe(false);
    changePassword.simulate('click')
    expect(wrapper.state('isModal')).toBe(true);
  });
});
