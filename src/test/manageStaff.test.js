import React from "react";
import { configure, shallow } from "enzyme";

// Import Page
import ManageStaff from "../component/ManageStaff";

describe("Manage Staff Page", () => {
  const wrapper = shallow(<ManageStaff />);

  test("Title should contain word \"Add Staff\"", () => {
    const title = wrapper.find("#title");
    expect(title.text()).toBe("Add Staff");
  });

  test("add staff button should activate modal", () => {
    const addStaffButton = wrapper.find("#addStaffButton");
    expect(wrapper.state('isModal')).toBe(false);
    addStaffButton.simulate('click')
    expect(wrapper.state('isModal')).toBe(true);
  });

  test("Snapshot Manage Staff", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
