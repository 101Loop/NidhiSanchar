import React from "react";
import logo from "../assets/schemes.jpg";
import { List } from "react-virtualized";

const listHeight = 620;
const rowHeight = 50;
const rowWidth = 5500;

class RightSideBar extends React.Component {
  constructor() {
    super();
    this.renderRow = this.renderRow.bind(this);
    this.ListItems = [
      {
        text: "SSY : fund requested (AP)",
        time: "2 hours ago",
        src: logo,
      },
      {
        text: "Mid Day meal: discussion opened",
        time: "5 hours ago",
        src: logo,
      },
      { text: "PMJDY : fund requested(UP)", time: "8 hours ago", src: logo },
      { text: "KVY: discussion updated", time: "11 hours ago", src: logo },
      { text: "NLPY: new query raised", time: "15 hours ago", src: logo },
      { text: "PMAY : fund requested (GOA)", time: "16 hours ago", src: logo },
      { text: "SSY: discussion opened", time: "20 hours ago", src: logo },
      { text: "PMJDY: new query raised", time: "20 hours ago", src: logo },
      { text: "Hello I am notification", time: "20 hours ago", src: logo },
      { text: "Hello I am notification", time: "20 hours ago", src: logo },
      { text: "Hello I am notification", time: "20 hours ago", src: logo },
      { text: "Hello I am notification", time: "20 hours ago", src: logo },
      { text: "Hello I am notification", time: "20 hours ago", src: logo },
      { text: "Hello I am notification", time: "20 hours ago", src: logo },
      { text: "Hello I am notification", time: "20 hours ago", src: logo },
      { text: "Hello I am notification", time: "20 hours ago", src: logo },
      { text: "Hello I am notification", time: "20 hours ago", src: logo },
      { text: "Hello I am notification", time: "20 hours ago", src: logo },
      { text: "Hello I am notification", time: "20 hours ago", src: logo },
      { text: "Hello I am notification", time: "20 hours ago", src: logo },
      { text: "Hello I am notification", time: "20 hours ago", src: logo },
      { text: "Hello I am notification", time: "20 hours ago", src: logo },
      { text: "Hello I am notification", time: "20 hours ago", src: logo },
      { text: "Hello I am notification", time: "20 hours ago", src: logo },
      { text: "Hello I am notification", time: "20 hours ago", src: logo },
      { text: "Hello I am notification", time: "20 hours ago", src: logo },
      { text: "Hello I am notification", time: "20 hours ago", src: logo },
      { text: "Hello I am notification", time: "20 hours ago", src: logo },
      { text: "Hello I am notification", time: "20 hours ago", src: logo },
      { text: "Hello I am notification", time: "20 hours ago", src: logo },
      { text: "Hello I am notification", time: "20 hours ago", src: logo },
      { text: "Hello I am notification", time: "20 hours ago", src: logo },
      { text: "Hello I am notification", time: "20 hours ago", src: logo },
      { text: "Hello I am notification", time: "20 hours ago", src: logo },
      { text: "Hello I am notification", time: "20 hours ago", src: logo },
    ];
  }
  render() {
    return (
      <div className="right-sidebar-content">
        <div className="sidebar-block-heading">
          <span className="heading">{this.ListItems.length} Notifications</span>
        </div>
        <div className="sidebar-block">
          <div className="list">
            <List
              width={rowWidth}
              height={listHeight}
              rowHeight={rowHeight}
              rowRenderer={this.renderRow}
              rowCount={this.ListItems.length}
            />
          </div>
        </div>
        {/* <div className='sidebar-block'>
          <span>Scroll to see more</span>
        </div> */}
        <style>
          {`  
          
              .right-sidebar {
                  display: block;
                  float: left;
                  width: 25%;
                  padding: 2rem ;
                  overflow-x: hidden;
                   border-radius: 14px;
                    padding: 0.7rem;
                    border-radius: 5px;
                  text-align: initial;

                }
                
                .right-sidebar-content .sidebar-block-heading{
                  
                    padding: 0.7rem;
                    border-radius: 5px;
                    // border: 1px solid #e8e7e7;
                  text-align: initial;

                }
                
               .heading{
                  font-size: 24px;
                  font-weight: 600;
                  padding: 0 1rem;
               }

                .story-list-item{
                  padding: 1rem 2rem 0 1rem;
                align-items: center;
                box-sizing: border-box;
                display: flex;
                flex: 1 1 0%;
                margin-bottom: 8px;
                padding-bottom:2px;
                min-height: 60px;
                position: relative;

                border-bottom: 1px solid rgba(0, 0, 0, 0.03);

                }

       
                .image-thumbnail{
                border: none;
                height: 3rem;
                padding: 2px 2px;
                width: 3rem;
                border-radius: 50%;
                box-sizing: border-box;
                padding: 2px 2px;
                z-index: 0;
                display: block;
                }

                .user-image{
                height: 3rem;
                width: 3rem;
                border-radius: 50%;
                box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .1);
                box-sizing: content-box;
                object-fit: cover;
                object-position: center;
                position: relative;
                vertical-align: middle;
                overflow: hidden;
                display: flex;
                align-items: center;
                }

                .user-title{
                  font-size: 16px;
                  font-weight: 500;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                    margin-left:1.5rem;
                    text-align: initial;
                }

                .icon-img{
                height: 32px;
                min-height: initial;
                width: 32px;
                position: cover;
                margin-left: 4px;
                border-radius: 50%;
                }
                `}
        </style>
      </div>
    );
  }
  renderRow({ index }) {
    return (
      <div className="story-list">
        <div className="story-list-item">
          <div className="image-thumbnail">
            <div className="user-image">
              <img
                src={this.ListItems[index].src}
                alt=""
                className="icon-img"
              ></img>
            </div>
          </div>
          <div className="user-title">
            <div>{this.ListItems[index].text}</div>
            <div>{this.ListItems[index].time}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default RightSideBar;
