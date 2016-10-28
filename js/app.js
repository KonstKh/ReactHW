var my_news = [
    {
        author: 'Саша Печкин',
        text: 'В четверг, четвертого числа...',
        bigText: 'в четыре с четвертью часа четыре чёрненьких чумазеньких чертёнка чертили чёрными чернилами чертёж.'
    },
    {
        author: 'Просто Вася',
        text: 'Считаю, что $ должен стоить 35 рублей!',
        bigText: 'А евро 42!'
    },
    {
        author: 'Гость',
        text: 'Бесплатно. Скачать. Лучший сайт - http://localhost:3000',
        bigText: 'На самом деле платно, просто нужно прочитать очень длинное лицензионное соглашение'
    }
];

var Article = React.createClass({

    propTypes: {
        data: React.PropTypes.shape({
            author: React.PropTypes.string.isRequired,
            text: React.PropTypes.string.isRequired,
            bigText: React.PropTypes.string.isRequired
        })
    },

    getInitialState: function () {
      return{
          visible : false
      }
    },
    readmoreClick : function(e){
        e.preventDefault();
        this.setState({visible:true});
    },
        render: function(){
            var author = this.props.data.author;
            var text = this.props.data.text;
            var bigText = this.props.data.bigText;
            var visible = this.state.visible;

            return(
                <div className="article">
                    <p className="news_author">{author}:</p>
                    <p className="news_text">{text}</p>
                    <a href="#" onClick={this.readmoreClick} className={'news__readmore ' + (visible ? 'none' : '')}>Details</a>
                    <p className={'news_big-text ' + (visible ? '' : 'none')}>{bigText}</p>
                </div>
            )
        }
    });

var News = React.createClass({
    propTypes: {
      data: React.PropTypes.array.isRequired
    },

	render: function(){
	    var data = this.props.data, newsTemplate;

        if(data.length > 0){
            newsTemplate = data.map(function (item, index) {
                return (
                     <div key={index}>
                         <Article data={item} />
                     </div>
                );
            });
        }
        else{
            newsTemplate = <p>Any news, sorry</p>
        }

        // console.log(newsTemplate);
		return (
				<div className="news">
                    {newsTemplate}
                    <strong
                        className={'news__count ' + (data.length > 0  ? '' : 'none')}>
                        Всего новостей: {data.length}
                    </strong>
				</div>
			);
	}
});

var TestInput = React.createClass({
    getInitialState: function() {
        return {
            inputValue : ''
        }
    },
    onBtnClickHandler : function(){
      alert(ReactDOM.findDOMNode(this.refs.myTestInput).value);
    },

   render: function () {
       return (
           <div>
             <input
                 className="test-input"
                 defaultValue=''
                 placeholder="input value"
                 ref ='myTestInput'
             />
               <button onClick={this.onBtnClickHandler}>Show Alert</button>
           </div>
       );
   } 
});

var App = React.createClass({
	render: function(){
		return (
				<div className="app">
					<h3>News</h3>
                    <News data={my_news} />
                    <TestInput/>
					{/*<Comments/>*/}
				</div>
			);
	}
});

ReactDOM.render(
	<App />,
	document.getElementById('root')
);