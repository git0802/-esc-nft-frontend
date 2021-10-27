import React from 'react';
import { Link } from '@reach/router';

import useAuth from '../../hooks/useAuth'

const Wallet = () => {
	const { login } = useAuth()
	return (
		<div className="row">
			<div className="col-lg-3 mb30 nodecoration" onClick={login}>
				<Link to='/explore'>
					<span className="box-url">
						<span className="box-url-label">Most Popular</span>
						<img src="./img/wallet/1.png" alt="" className="mb20" />
						<h4>Metamask</h4>
						<p>Start exploring blockchain applications in seconds.  Trusted by over 1 million users worldwide.</p>
					</span>
				</Link>
			</div>
		</div>
	)
};
export default Wallet;