import React from "react";
import { configure, shallow } from "enzyme";

// Import Page
import ManageDateRoom from "../component/Room/ManageDateRoom";
import ManageSubcategoryRoom from "../component/Room/ManageSubcategoryRoom";
import ManageVenueRoom from "../component/Room/ManageVenueRoom";

describe("ManageDateRoom", () => {
  const manageDateRoom = shallow(<ManageDateRoom />);

  test("Title should contain word \"Room\"", () => {
    const title = manageDateRoom.find("#title");
    expect(title.text()).toBe("Room");
  });

  test("Snapshot ManageDateRoom", () => {
    expect(manageDateRoom).toMatchSnapshot();
  });
});

describe("ManageSubcategoryRoom", () => {
  const manageSubcategoryRoom = shallow(
    <ManageSubcategoryRoom />
  );

  test("Title should contain word \"Room\"", () => {
    const title = manageSubcategoryRoom.find("#title");
    expect(title.text()).toBe("Room");
  });

  test("manageSubcategoryTitle should contain word \"Manage Subcategory\"", () => {
    const title = manageSubcategoryRoom.find("#manageSubcategoryTitle");
    expect(title.text()).toBe("Manage Subcategory");
  });

  test("Snapshot ManageSubcategoryRoom", () => {
    expect(manageSubcategoryRoom).toMatchSnapshot();
  });
});

describe("ManageVenueRoom", () => {
  const manageVenueRoom = shallow(<ManageVenueRoom />);

  test("change password button should activate modal", () => {
    const title = manageVenueRoom.find("#title");
    expect(title.text()).toBe("Room");
  });

  test("Title should contain word \"Manage Subcategory\"", () => {
    const title = manageVenueRoom.find("#manageVenueTitle");
    expect(title.text()).toBe("Manage Venue");
  });

  test("Snapshot ManageVenueRoom", () => {
    expect(manageVenueRoom).toMatchSnapshot();
  });
});
