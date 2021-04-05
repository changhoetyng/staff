import React from "react";
import { configure, shallow } from "enzyme";

// Import Page
import ManageDateSportComplex from "../component/SportComplex/ManageDateSportComplex";
import ManageSubcategorySportComplex from "../component/SportComplex/ManageSubcategorySportComplex";
import ManageVenueSportComplex from "../component/SportComplex/ManageVenueSportComplex";

describe("ManageDateSportComplex", () => {
  const manageDateSportComplex = shallow(<ManageDateSportComplex />);

  test("Title should contain word \"Sport Complex\"", () => {
    const title = manageDateSportComplex.find("#title");
    expect(title.text()).toBe("Sport Complex");
  });

  test("Snapshot ManageDateSportComplex", () => {
    expect(manageDateSportComplex).toMatchSnapshot();
  });
});

describe("ManageSubcategorySportComplex", () => {
  const manageSubcategorySportComplex = shallow(
    <ManageSubcategorySportComplex />
  );

  test("Title should contain word \"Sport Complex\"", () => {
    const title = manageSubcategorySportComplex.find("#title");
    expect(title.text()).toBe("Sport Complex");
  });

  test("manageSubcategoryTitle should contain word \"Manage Subcategory\"", () => {
    const title = manageSubcategorySportComplex.find("#manageSubcategoryTitle");
    expect(title.text()).toBe("Manage Subcategory");
  });

  test("Snapshot ManageSubcategorySportComplex", () => {
    expect(manageSubcategorySportComplex).toMatchSnapshot();
  });
});

describe("ManageVenueSportComplex", () => {
  const manageVenueSportComplex = shallow(<ManageVenueSportComplex />);

  test("change password button should activate modal", () => {
    const title = manageVenueSportComplex.find("#title");
    expect(title.text()).toBe("Sport Complex");
  });

  test("Title should contain word \"Manage Subcategory\"", () => {
    const title = manageVenueSportComplex.find("#manageVenueTitle");
    expect(title.text()).toBe("Manage Venue");
  });

  test("Snapshot ManageVenueSportComplex", () => {
    expect(manageVenueSportComplex).toMatchSnapshot();
  });
});
