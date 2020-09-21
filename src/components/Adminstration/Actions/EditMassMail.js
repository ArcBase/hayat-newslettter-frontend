import React, { Component } from "react";
import { Input, Form, Select, notification, message } from "antd";
import { connect } from "react-redux";

import { Link } from "react-router-dom";
import SideDash from "../../containers/sideNav";
import axios from "axios";
//import TemporaryDrawer from '../Sidebar/SideNav'

const TextArea = Input.TextArea;
const { Option } = Select;

const IconText = ({ icon, text }) => (
  <span>
    {React.createElement(icon, { style: { marginRight: 8 } })}
    {text}
  </span>
);

const formItemLayout = {
  wrapperCol: { span: 12, offset: 6 },
};

const openNotification = (msg) => {
  notification.open({
    message: "Alert!",
    description: msg,
    onClick: () => {
      console.log("Notification Clicked!");
    },
  });
};

const NewsSource = [
  "Punch",
  "ThisDay",
  "Daily Independent",
  "Pulse.ng",
  "PM News",
  "Sun",
  "This Day",
  "Sahara Reporters",
  "The Nation",
  ''
];


const host = "https://backend-hayat.herokuapp.com";

class EditMailItem extends Component {
  state = {
    newsImage: null,
    newsData: [],
    loading: false,
  };

  handleImageChange = (e) => {
    this.setState({
      newsImage: e.target.files[0],
    });
  };

  getNewsData = async (news_id) => {
    const NewsID = this.props.match.params.NewsID;
    const endpoint = host + `/api/news-detail/${NewsID}`;
    await axios.get(endpoint).then((res) => {
      if (res.status == 200) {
        this.setState({
          newsData: res.data,
        });
        console.log("News Item", res.data);
      } else {
      }
    });
  };

  Create_Query = async (values, err) => {
    const NewsID = this.props.match.params.NewsID;
    const Title = values["Title"] === undefined ? null : values["Title"];
    const Content = values["Content"] === undefined ? null : values["Content"];
    const Publisher =
      values["Publisher"] === undefined ? null : values["Publisher"];

    const Link = values["Link"] === undefined ? null : values["Link"];
    const Source = values["Source"];

    const Original_User_id = this.state.Owner;
    const Category = parseInt(this.Category_ID);
    const Image = this.state.newsImage;

    //Assigns New Form Data
    let form_data = new FormData();
    form_data.append("Title", Title);
    form_data.append("Content", Content);

    form_data.append("Source", Source);
    form_data.append("Link", Link);
    form_data.append("Image", Image);

    const endpoint = host + `/api/edit_news/${NewsID}/`;
    axios.post(endpoint, form_data).then((res) => {
      if (res.status == 200) {
        console.log(res.data);
        const take_response = res.data["Message"];
        message.success("Edited Successfully");
        this.props.history.push("/NewsLink");
      } else {
        message.error("Error Creating Product");
      }
    });
  };

  componentDidMount() {
    this.getNewsData();
  }

  render() {
    const { newsData } = this.state;
    return (
      <>
        <div className="wrapper">
          <SideDash />

          <div className="main">
            <div className="fitter">
              <div className="page-grid">
                <div className="left">
                  <div className="">
                    <div className="form-box">
                      <div className="form-box-width">
                        <Form onFinish={this.Create_Query}>
                          <Form.Item name="Title">
                            <Input placeholder={newsData.Title} enterButton />
                          </Form.Item>

                          <Form.Item name="Content">
                            <TextArea placeholder={newsData.Content} rows={4} />
                          </Form.Item>

                          <Form.Item name="Source">
                            <Select placeholder="Select Source">
                              {NewsSource.map((c) => (
                                <Option value={c}>{c}</Option>
                              ))}
                            </Select>
                          </Form.Item>

                          <Form.Item name="Link">
                            <Input placeholder={newsData.Link} enterButton />
                          </Form.Item>

                          <Form.Item name="Image_Post">
                            <Input
                              type="file"
                              onChange={this.handleImageChange}
                              name="Post_Image1"
                            />
                          </Form.Item>

                          <Form.Item>
                            <button
                              className="form-submit-button"
                              htmlType="submit"
                            >
                              Edit
                            </button>
                          </Form.Item>
                        </Form>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="right">
                  <div className="editBox">
                    <div className="editBox-heading">
                      <p className="editBox-header-text">
                        {newsData.Title}
                      </p>
                    </div>
                    <div className="editBox-content">
                      <p className="editBox-content-text">
                        {newsData.Content}
                      </p>
                      <a 
                      className="custom-button"
                      target="__blank" href={newsData.Link}>
                        View
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

//   const mapDispatchToProps = dispatch => {
//     return {
//       refreshCart: (token) => dispatch(fetchCart(token))
//     };
//   };

export default connect(mapStateToProps, null)(EditMailItem);
