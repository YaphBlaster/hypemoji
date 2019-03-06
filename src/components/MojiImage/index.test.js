import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import MojiImage, { AddButton } from "./index";
import { toast } from "react-toastify";
import { initialState, addToComicStrip } from "../ComicStripBadge/ducks";
jest.mock("../ComicStripBadge/ducks");
jest.mock("react-toastify");

const create = (state = initialState) => {
  const store = {
    getState: jest.fn(() => ({ comicStrip: state })),
    dispatch: jest.fn(() => ({})),
    subscribe: jest.fn()
  };
  return { store };
};

const minProps = {
  source: "something",
  comicId: "123abcd"
};

const { store: defaultStore } = create();

function createComponent(store = defaultStore) {
  return (
    <Provider store={store}>
      <MojiImage {...minProps} />
    </Provider>
  );
}

afterEach(() => {
  jest.clearAllMocks();
});

it("renders without crashing", () => {
  const container = mount(createComponent());

  expect(container.length).toEqual(1);
});

// INTEGRATION TEST: When add button clicked, add to comic strip local is dispatched
it("dispatches add to comic strip local", () => {
  const container = mount(createComponent());

  const addButton = container.find(AddButton);
  addButton.simulate("click");

  expect(addToComicStrip).toHaveBeenCalledTimes(1);
});

// INT TEST: Add button clicked, toast is fire

it("toast info trigger on add button click", () => {
  const container = mount(createComponent());

  const addButton = container.find(AddButton);
  addButton.simulate("click");

  expect(toast.info).toHaveBeenCalledTimes(1);
});

// INT TEST:If comic strip >= 10, dont dispatch

it("Will not dispatch if comic strip >= 10", () => {
  const { store } = create({
    ...initialState,
    comicStrip: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
  });
  const container = mount(createComponent(store));

  const addButton = container.find(AddButton);
  addButton.simulate("click");

  expect(addToComicStrip).toHaveBeenCalledTimes(0);
});

//INT TEST: If Comic strip >= 10, show toast error
it("Error toast if comic strip >= 10", () => {
  const { store } = create({
    ...initialState,
    comicStrip: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
  });
  const container = mount(createComponent(store));

  const addButton = container.find(AddButton);
  addButton.simulate("click");

  expect(toast.error).toHaveBeenCalledTimes(1);
});

// UNIT TEST: ON load, Image is pointing to our sourced image
it("dispatches add to comic strip local", () => {
  const container = mount(createComponent());

  const image = container.find("img");
  expect(image.getDOMNode().getAttribute("src")).toEqual(minProps.source);
});
