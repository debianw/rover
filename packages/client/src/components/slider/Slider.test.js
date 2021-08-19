import { rest } from "msw";
import { BrowserRouter as Router } from "react-router-dom";
import { setupServer } from "msw/node";
import { render, act, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import "@testing-library/jest-dom";
import Slider from "./Slider";
import termroverImages from "../../mocks/termrover-images";
import config from "@rover/core/config";

const SliderRender = (props) => {
  return (
    <Router>
      <Slider {...props} />
    </Router>
  );
};

const server = setupServer(
  rest.get(
    `${config.api}/`,
    (req, res, ctx) => {
      return res(
        ctx.json({
          key: "73c5032a1d659438a7386f9c1137d173c680676e155c2b7dd51bf60f41de507d",
          numImages: 3,
        })
      );
    }
  ),
  rest.get(
    `${config.api}/:index`,
    (req, res, ctx) => {
      return res(ctx.json(termroverImages[req.params.index]));
    }
  )
);

beforeAll(() => {
  server.listen();
});
afterEach(() => server.resetHandlers());
afterAll(() => {
  server.close();
  jest.useRealTimers();
}); 

// --
test("Should render first Image", async () => {
  const { getByText, getByAltText } = render(
    <SliderRender autoPlay={false} />
  );

  await waitFor(() =>
    expect(getByAltText("pic-810961")).toBeInTheDocument()
  );

  expect(getByText("1 of 3")).toBeInTheDocument();
});

// --
test("Should go next", async () => {
  const { getByText, getByTestId, getByAltText } = render(
    <SliderRender autoPlay={false} />
  );

  await waitFor(() =>
    expect(getByAltText("pic-810961")).toBeInTheDocument()
  );

  expect(getByText("1 of 3")).toBeInTheDocument();

  // confirm there's a right button
  const rightButton = getByTestId("right-button");
  expect(rightButton).toBeInTheDocument();

  // go to next image #2
  act(() => {
    userEvent.click(rightButton);
  });

  expect(getByText("2 of 3")).toBeInTheDocument();

  await waitFor(() =>
    expect(getByAltText("pic-810962")).toBeInTheDocument()
  );
  
  // go to next image #3
  act(() => {
    userEvent.click(rightButton);
  });

  expect(getByText("3 of 3")).toBeInTheDocument();

  await waitFor(() =>
    expect(getByAltText("pic-810963")).toBeInTheDocument()
  );

  // should go back to image #1 
  act(() => {
    userEvent.click(rightButton);
  });

  expect(getByText("1 of 3")).toBeInTheDocument();

  await waitFor(() =>
    expect(getByAltText("pic-810961")).toBeInTheDocument()
  );
});

// --
test("Should go prev", async () => {
  const { getByText, getByTestId, getByAltText } = render(
    <SliderRender autoPlay={false} />
  );

  await waitFor(() =>
    expect(getByAltText("pic-810961")).toBeInTheDocument()
  );

  expect(getByText("1 of 3")).toBeInTheDocument();

  // confirm there's a right button
  const rightButton = getByTestId("right-button");
  expect(rightButton).toBeInTheDocument();

  // go to next image
  act(() => {
    userEvent.click(rightButton);
  });

  expect(getByText("2 of 3")).toBeInTheDocument();

  // confirm there's a left button
  const leftButton = getByTestId("left-button");
  expect(leftButton).toBeInTheDocument();

  // go to prev image
  act(() => {
    userEvent.click(leftButton);
  });

  await waitFor(() => expect(getByAltText("pic-810961")).toBeInTheDocument());

  expect(getByText("1 of 3")).toBeInTheDocument();
});