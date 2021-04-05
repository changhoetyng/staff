import React from "react";
import { configure, shallow } from "enzyme";

// Import Page
import LoginPage from "../component/LoginPage";

describe("Login Page", () => {
  const wrapper = shallow(<LoginPage />);

  test("Login button should contain word \"Login\"", () => {
    const loginButton = wrapper.find("#loginButton");
    expect(loginButton.text()).toBe("Login");
  });
});
