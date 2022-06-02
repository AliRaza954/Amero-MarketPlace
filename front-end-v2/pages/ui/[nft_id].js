import {
  Card,
  Row,
  Col,
  CardTitle,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
} from "reactstrap";
import { useRouter } from "next/router";

const NFTinfo = (props) => {
  const router = useRouter();
  const { nft_id } = router.query;
  return <h1>{nft_id}</h1>;

};

export default NFTinfo;
