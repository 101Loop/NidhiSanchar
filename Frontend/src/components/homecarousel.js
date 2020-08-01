import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@material-ui/core";

export default function HomeCarousel(props) {
  var items = [
    {
      src:
        "https://cdn.s3waas.gov.in/s33def184ad8f4755ff269862ea77393dd/uploads/2020/03/2020031918.jpg",
    },
    {
      src:
        "https://cdn2.droom.in/photos/images/web/content/donation/donation-banner-w.jpg",
    },

    {
      src:
        "https://pmsma.nhp.gov.in/wp-content/uploads/2018/06/Banner-nearest-facility-search-new.jpg",
    },
    {
      src: "https://nsdcindia.org/sites/default/files/rpl-banner-nsdc.jpg",
    },
  ];

  return (
    <Carousel navButtonsAlwaysVisible="true">
      {items.map((item) => (
        <Item item={item} />
      ))}
    </Carousel>
  );
}

function Item(props) {
  return (
    <Paper>
      <div
        style={{
          backgroundImage: `url(${props.item.src})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "60vh",
        }}
      ></div>
    </Paper>
  );
}
