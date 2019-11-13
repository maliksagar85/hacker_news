import React from 'react';
import _ from 'lodash';

class TableComponent extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            stories: []
        }
        this.page = 0
        this.getDataFromApi();
    } 

    getDataFromApi = async () => {

        this.page++;
        this.setState({loading: true});
        const response = await fetch(`https://hn.algolia.com/api/v1/search_by_date?page=${this.page}`),
        // const response = await fetch(`https://hn.algolia.com/api/v1/search_by_date?page=${this.page}`),
        stories = await response.json();
        let hide_story = JSON.parse(localStorage.getItem("hideStories")) || [],
        newData = _.differenceBy(stories.hits, hide_story, 'objectID');
        this.setState({stories: newData, total_page: stories.nbPages, loading: false})

    }

    hideRowData = (objectID) => {
        
        let story_arr = JSON.parse(localStorage.getItem("hideStories")) 
        let delete_story = _.remove(this.state.stories, (story) => story.objectID !== objectID )
        this.setState({stories: delete_story})

    }

    upvoteStory() {
        alert("Hello");
    }
    render() {
       
        let stories = this.state.stories,
        story_listing = [];

   
        
        {stories.map((story, index) => {
            this.state.index=index+1;
            story_listing.push(
                <tr key={story.objectID}>
                    <th width="50">{this.state.index}</th>
                    <th>{story.upVote !== true && <i onClick={()=>this.upvoteStory(story.objectID)} className="fa fa-sort-asc" aria-hidden="true"></i>}</th>
                    <td>
                        <span className="story-title"> {story.story_title || story.title} </span>
                        <span className="story-url"> <a href={story.story_url || story.url}>( Domain )</a> </span>
                        <span className="story-auther"> by <b>{story.author}</b> </span>
                        <span className="story-date"> {(story.created_at_i)} </span>
                        <span className="story-unvote" > {story.upVote === true && '| unvote | '} </span>
                        <span className="story-hide" onClick={()=>this.hideRowData(story.objectID)}> [ Hide ] </span> 
                    </td>
                </tr>
            ) }
       )};

        return( <div className="container">
                <table className="table">
                    <thead>
                        <tr>
                           <th className="header" colSpan="4">
                                <img width="20" height="20" src={require('./icon.png')} alt="icon"/>
                                <span className="hacker"><a href="#"> Hacker News</a> </span>
                                <span className="new active"><a href="#new"> new </a></span>
                            </th>
                        </tr>
                    </thead>


                    <tbody>{story_listing}</tbody>

                    {(this.page < this.state.total_page-1) && 
                        <tfoot> 
                            <tr>
                                <td colSpan={4}><p className="more" onClick={this.getDataFromApi}>More</p></td>
                            </tr>
                        </tfoot> 
                    }

                </table>
            </div>
        );
    
    }
}

export default TableComponent;