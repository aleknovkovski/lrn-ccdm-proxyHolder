import React, { useEffect, useState } from 'react'

function App() {
	const [value, setValue] = useState('/posts')
	const [data, setData] = useState([])

	useEffect(() => {
		const API_URL = `http://${window.location.hostname}:1338${value}`
		console.log(API_URL)
		fetch(API_URL)
			.then((t) => t.json())
			.then((data) => {
				setData(data)
			})
	}, [value])

	function Post (props) {

		const [isOpen, setIsOpen] = useState(false)
		return <div key={props.id} data-id={props.id}>
			<h2>{props.title}</h2>
			{
				isOpen ? "open"
				: "closed"
			}
		</div>
	}

	return (
		<div>
			<a><h1>Hello World!</h1></a>
			<input
				type="text"
				placeholder="write the relative URL here to get data"
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>
			<div>{data.map((item) => {
				console.log(item)
				return <Post id={item.id} title={item.title}/>
			})}</div>
		</div>
	)
}

export default App
