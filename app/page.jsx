import Feed from '@components/feed'

const Home = () => {
  return (
    <section className="W-full flex-center flex-col">
       <h1 className="head_text text-center">Discover & Share</h1> 
       <br className="max-md:hidden" />
       <span className="orange_gradient head_text text-center"> AI-Powred Prompts</span>
       <p className="desc text-center">Promptopia is an open-source AI prompting tool for modern world to discover, create and share creative prompts</p>
      
        {/* Feed  */}
        <Feed />
    </section>
  )
}

export default Home