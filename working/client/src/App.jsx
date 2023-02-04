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
		const [comments, setComments] = useState([])

		useEffect(()=> {
			if(isOpen) {
				const API_URL = `http://${window.location.hostname}:1338/posts/${props.id}/comments/`
				console.log(API_URL)
				fetch(API_URL)
					.then((t) => t.json())
					.then((json) => setComments(json))
			}
		}, [isOpen])

		const commentsMarkup = comments.map((comment) => {
			return (<div key={comment.id}>
				<b>{`${comment.name} | (${comment.email})`}</b>
				<p>{comment.body}</p>
			</div>)
		})

		const openedMarkup = (
			<article>
				<p>{props.body}</p>
				<h3>Comments</h3>
				{commentsMarkup}
			</article>
		)

		return <div key={props.id} data-id={props.id}>
			<h2 onClick={()=> setIsOpen(true)}>{props.title}</h2>
			{
				isOpen ? openedMarkup
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
				return <Post key={item.id} id={item.id} title={item.title} body={item.body}/>
			})}</div>
		</div>
	)
}

export default App
