import React, { useEffect } from "react";
// import { myStxAddress, userSession  } from "../../components/auth";

import { useState } from "react";

import imageCompression from 'browser-image-compression';


// import "../../styles/nextjs-argon-dashboard.css";

// import fileUpload from "../../components/file-upload";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  Table,
} from "reactstrap";
import { Mint } from "../../stacks-calls/contract-calls";
import { deleteAllData, fetchNFTData } from "../../stacks-calls/gaia_storage";
// layout for this page

// core components


function Profile() {

  const [isFetching, setFetching] = useState(false);

  const [data, setData] = useState([]);
  
  const [state, setState] = useState({
    Username: "",
    EmailAddress: "",
    FirstName: "",
    LastName: "",
  });
 

  const [filestate, setfilestate] = useState({

    // Initially, no file is selected
    selectedFile: null
  });

  const onFileChange = (event) => {

    // Update the state
    setfilestate({ selectedFile: event.target.files[0] });


  };

  const onFileUpload = async () => {

    if (ProfilePicValidation(filestate.selectedFile)) {

      const ResizedImage = await ResizeImage(filestate.selectedFile, 300);
      setfilestate({ selectedFile: ResizedImage });
      Mint(ResizedImage);
    }

    else{
      setfilestate({ selectedFile: null});
    }

    // Request made to the backend api
    // Send formData object
    // axios.post("api/uploadfile", formData);
  };

  return (
    <>
      
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="rounded-circle"
                        // src={filestate.selectedFile ? filestate.selectedFile : defaultimage}
                      />
                    </a>
                  </div>
                </Col>
              </Row>
              <div></div>
              <CardBody className="pt-0 pt-md-4">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      <div>
                        <span className="heading">0</span>
                        <span className="description">Property Minted</span>
                      </div>
                      <div>
                        <span className="heading">89</span>
                        <span className="description">STX</span>
                      </div>
                    </div>
                  </div>
                </Row>
                <div className="text-center">
                  <h3>
                    {state.FirstName} {state.LastName}
                  </h3>
                  <h4>
                    <span className="font-weight-light"> {state.Username}</span>
                  </h4>
                  <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    {state.EmailAddress}
                  </div>

                  <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    {/* {myStxAddress()} */}
                    {/* <fileUpload/> */}
                    <input type="file" onChange = {onFileChange}/>
                    <Button
                      color="primary"
                      href="#pablo"
                      size="sm"
                      onClick = {onFileUpload}
                    >
                      Mint
                    </Button>

                    <Button
                      color="primary"
                      href="#pablo"
                      size="sm"
                      onClick = {deleteAllData}
                    >
                      Delete Data
                    </Button>

                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">My account</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      href="#pablo"
                      size="sm"
                    >
                      Submit
                    </Button>
                    {/* <Button
                      color="primary"
                      href="#pablo"
                      size="sm"
                      onClick={Mint(filestate.selectedFile)}
                    >
                      Mint
                    </Button> */}
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    User information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Username
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-username"
                            placeholder="Username"
                            type="text"
                            name="Username"
                            // value={state.Username}
                            defaultValue={state.Username}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Email address
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            placeholder="jesse@example.com"
                            type="email"
                            name="EmailAddress"
                            // value={state.EmailAddress}
                            defaultValue={state.EmailAddress}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            First name
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-first-name"
                            placeholder="First name"
                            type="text"
                            name="FirstName"
                            // value={state.FirstName}
                            defaultValue={state.FirstName}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Last name
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-last-name"
                            placeholder="Last name"
                            type="text"
                            name="LastName"
                            // value={state.LastName}
                            defaultValue={state.LastName}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Properties Minted</h3>
                  </div>

                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">NFT ID</th>
                    <th scope="col">NFT PIC</th>
                    <th scope="col">Price</th>
                    <th scope="col">BTC Locked</th>
                    <th scope="col">BTC APPR</th>
                    <th scope="col">Agent</th>
                    <th scope="col">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map(nft => 
                    // const btc = await getBTC();
                    // let nftid = nft.nft_id.slice(1, nft.nft_id.length);
                    // nftid = parseInt(nftid);
                    // const nftdata = await getNftData(nftid);
                    <tr>
                      <th scope="row">{nft.nft_id}</th>
                      <td>
                        <a href={nft.nft_pic}></a>
                      </td>
                      <td>{nft.price}</td>
                      <td>{nft.btcLock}</td>
                      <td>
                        <i className="fas fa-arrow-up text-success mr-3" />{nft.btcAppr}
                      </td>
                      <td>{nft.agentAddress}</td>
                      <td>{new Date(nft.unlockTime * 1000).toLocaleString()}</td>
                      <Button >Claim</Button>
                      
                    </tr>
                  
                  )}
                  
                </tbody>
              </Table>
            </Card>
          </Col>

        </Row>
      </Container>
    </>
  );
}

export default Profile;

function ProfilePicValidation(file) {

  if (file) {
    // Allowing file type
    const allowedExtensions =
      /(\/jpg|\/jpeg|\/png)$/i;

    if (!allowedExtensions.exec(file.type)) {
      alert('Invalid file type');
      return false;
    }
    else {
      return true;
    }
  }
  else {
    alert('No File Selected');
    return false;
  }
}

async function ResizeImage(file, MaxWidth) {
  const options = {
    maxWidthOrHeight: MaxWidth,
  }

  const ResizedImage = await imageCompression(file, options);

  return ResizedImage;
}
