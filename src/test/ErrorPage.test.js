import React from "react";
import { configure, shallow } from "enzyme";

// Import Page
import NotAuthorized from "../component/NotAuthorized";
import NotFound from "../component/NotFound";

describe("Render Error Page", () => {
  const notAuthorized = shallow(<NotAuthorized />);
  const notFound = shallow(<NotFound />);

  test("Render not authorized page", () => {
    expect(notAuthorized.find("h1").text()).toContain(
      "400 You are not authorized"
    );
  });

  test("Render not found page", () => {
    expect(notFound.find("h1").text()).toContain("404 Page Not Found");
  });

  test("Snapshot Not Authorized page", () => {
    expect(notAuthorized).toMatchSnapshot();
  });
  test("Snapshot Not Found page", () => {
    expect(notFound).toMatchSnapshot();
  });
});
