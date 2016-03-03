const React = require('react');

class BountyForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      card: {
        number: '',
        cvc: '',
        exp_month: '',
        exp_year: ''
      }
    };
  }

  componentDidMount() {
    Stripe.setPublishableKey('pk_test_4SrTTNmWSmtYCG2BxAYseTE9'); // set your test public key
  }

  handleSubmit(e) {
    e.preventDefault();
    Stripe.createToken(this.state.card, function (status, response) {
      console.log( status, response );
      var token = response.id;
      //send the token to the server
      $.ajax({
        url: 'http://127.0.0.1:3000/stripe',
        dataType: 'json',
        type: 'POST',
        data: {stripeToken: token},
        success: function(data) {
          console.log(data);
        },
        error: function(xhr, status, err) {
          console.error('/stripe', status, err.toString());
        }
      });

    });
  }

  handleChange(e) {
    let card = this.state.card;
    card[e.target.name] = e.target.value;
    this.setState(card);
    console.log(this.state);
  }

  render() {
    return (
      <div className="bountyFormDiv">
        <h2>Post a Bounty</h2>
        <h3>Describe Your Bounty</h3>
        <h3>Enter Payment Information</h3> 
        <p>Note: You will not be charged until you approve and merge a pull request from a bounty hunter.</p>
        <p>Github Bounties will never store your credit card information. </p>

        <form onSubmit={ this.handleSubmit.bind(this) } >
          <div class="form-row">
            <label>
            <span>Card Number</span>
            <input maxLength="20" name="number" required onChange={this.handleChange.bind(this)} />
            </label>
          </div>
          <div class="form-row">
            <label>
              <span>CVC</span>
              <input maxLength="4" name="cvc" required onChange={this.handleChange.bind(this)} />
            </label>
          </div>
          <div class="form-row">
            <label>
              <span>Expiration (MM/YYYY)</span>
            <input maxLength="2" name="exp_month" required onChange={this.handleChange.bind(this)} />
            </label>
            <span> / </span>
            <input maxLength="4" name="exp_year" required onChange={this.handleChange.bind(this)} />
          </div>
          <button type="submit">Enter</button>
        </form>
      </div>
    );
  }
}

module.exports = BountyForm;
