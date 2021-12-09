import React, { Component } from "react";
import Web3 from "web3";
import contract from "./contract";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import io  from "socket.io-client";
import { withRouter } from "react-router-dom";

class Livegame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avaiablebets: [],
      betdetails: [],
      account: null,
      socketObject: null
    };

    console.log(props);

    let socketTemp = io("http://localhost:8080");

    socketTemp.on("connect", () => {
      this.setState({socketObject: socketTemp});
    })
  }
  //=================================GET AVAILABLE BETS=====================================
  async componentWillMount() {
    const web3 = new Web3(Web3.givenProvider);
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    contract.methods
      .getAvailableBets()
      .call()
      .then(
        (result) => {
          this.setState({ avaiablebets: result });
          console.log(this.state.avaiablebets);
          this.state.avaiablebets.map((betid) =>
            contract.methods
              .bets(betid)
              .call()
              .then((result) => {
                console.log(result);
                this.setState({
                  betdetails: this.state.betdetails.concat(result),
                });
                console.log(this.state.betdetails);
              })
          );
        }

        // do stuff with returned values
      );
  }

  //==================================Accept BET==========================================
  onClick = async (id, value) => {

    // let joinObject = {
    //   senderId: this.state.userSocketId,
    //   pw: this.state.gameJoinInput,
    // };

    // this.state.userSocket.emit("JoinGame", joinObject); // user asking to join another player's game
    // this.setState({ gameJoinInput: "" });

    const web3 = new Web3(Web3.givenProvider);

    contract.methods
      .acceptBet(id)
      .send({
        from: this.state.account,
        gasLimit: web3.eth.getBlock("latest").gasLimit,
        value: web3.utils.toWei(value, "ether"),
      })
      .then((receipt) => {
        console.log(receipt);
        for(let i of this.state.betdetails) {
          if(i.id == id) {
            console.log(i.name);
            this.state.socketObject.emit("finalShake", i.name);
            this.props.history.push("/chessGame", {inGame: true, color: "black", gameId: i.name})
          }
        }
        
      });
  };
  render() {
    const web3 = new Web3(Web3.givenProvider);
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Challenger</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Game</TableCell>
              <TableCell>Price</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.betdetails.map((row) => (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell>{row.challenger}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.conditions}</TableCell>
                <TableCell>{web3.utils.fromWei(row.price, "ether")}</TableCell>
                <TableCell>
                  {row.challenger != this.state.account ? (
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() =>
                        this.onClick(
                          row.id,
                          web3.utils.fromWei(row.price, "ether")
                        )
                      }
                    >
                      join
                    </Button>
                  ) : (
                    ""
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

export default withRouter(Livegame);
