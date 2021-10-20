import styled from "styled-components";

import React from "react";
import Leftside from "./Leftside";
import Main from "./Main";
import Rightside from "./Rightside";

const Home = () => {
	return (
		<Container>
			<Section>
				<h5>
					<div className='link'>Hiring in a hurry? &nbsp;</div>
				</h5>
				<p>
					Find talented pro in record time with Upwork and keep business moving.
				</p>
			</Section>
			<Layout>
				<Leftside />
				<Main />
				<Rightside />
			</Layout>
		</Container>
	);
};

const Container = styled.div`
	max-width: 100%;
	padding-top: 52px;
`;

const Section = styled.section`
	display: flex;
	justify-content: center;
	box-sizing: content-box;
	min-height: 30px;
	text-decoration: underline;
	padding: 24px 0 0;
	text-align: center;

	h5 {
		font-size: 14px;
		color: #0a66c2;

		.link {
			font-weight: 700;
		}
	}

	p {
		font-size: 14px;
		font-weight: 600;
		color: #434649;
	}

	@media (max-width: 768px) {
		flex-direction: column;
		padding: 0 5px;
	}
`;

const Layout = styled.div`
	display: grid;
	grid-template-areas: "leftside main rightside";
	grid-template-columns: minmax(0, 5fr) minmax(0, 12fr) minmax(300px, 7fr);
	column-gap: 16px;
	row-gap: 16px;
	margin: 16px 0;

	@media (max-width: 768px) {
		display: flex;
		flex-direction: column;
		margin: 25px 0;
		padding: 0 5px;
	}
`;

export default Home;
