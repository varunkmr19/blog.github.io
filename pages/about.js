import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'
import { PageSeo } from '@/components/SEO'

export default function About() {
  return (
    <>
      <PageSeo
        title={`About - ${siteMetadata.author}`}
        description={`About me - ${siteMetadata.author}`}
        url={`${siteMetadata.siteUrl}/about`}
      />
      <div className="divide-y">
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            About
          </h1>
        </div>
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="flex flex-col items-center pt-8 space-x-2">
            <img src={siteMetadata.image} alt="avatar" className="w-48 h-48 rounded-full" />
            <h3 className="pt-4 pb-2 text-2xl font-bold leading-8 tracking-tight">
              {siteMetadata.author}
            </h3>
            <div className="text-gray-500 dark:text-gray-400">Full Stack Engineer</div>
            <div className="text-gray-500 dark:text-gray-400">Spyne.ai</div>
            <div className="flex pt-6 space-x-3">
              <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} />
              <SocialIcon kind="github" href={siteMetadata.github} />
              <SocialIcon kind="youtube" href={siteMetadata.youtube} />
              <SocialIcon kind="linkedin" href={siteMetadata.linkedin} />
            </div>
          </div>
          <div className="pt-8 pb-8 prose dark:prose-dark max-w-none xl:col-span-2">
            <p>
              Hi, My name is Varun. I've graduated from Chandigarh University in 2021 with a major
              in Computer Science and Engineering. Currently, I'm doing an Intership as a Full-Stack
              Engineer at Spyne.ai which is a Saas based startup that focuses to redefine
              photo-shoot and image processing workflows using the power of AI.
            </p>
            <p>
              As a Full-Stack engineer I am responsible for developing and designing front end web
              architecture and ensuring the respinsiveness of web applications. At the same time
              writing highly scalable backend APIs.
            </p>

            <h2>
              <strong>Experience</strong>
            </h2>
            <hr />
            <p>
              <strong>
                <em>Spyne.ai</em>
              </strong>{' '}
              - <em>Full Stack Engineer</em>
            </p>
            <p>July 2021 - Present</p>
            <ul>
              <li> Writing highly scalable backend APIs in Flask</li>
              <li> Optimized response time of some APIs by 150%</li>
              <li> Designing reusable components in React</li>
            </ul>
            <p>
              <strong>
                <em>Virtusa</em>
              </strong>{' '}
              - <em>Intern Technology</em>
            </p>
            <p>May 2020 - July 2020</p>
            <ul>
              <li>
                Worked as a back-end developer using Java-related technologies and frameworks.
              </li>
              <li>Used technologies include Java SE 8, Maven, Spring Boot, Hibernate and MySQL.</li>
              <li>
                Prototyped a web application that monitors and generates reports for the various
                in-house training.
              </li>
            </ul>

            <h2>
              <strong>Skills</strong>
            </h2>
            <hr />
            <p>
              <strong>Programming Languages: </strong>Python, C++, JavaScript, and SQL
            </p>
            <p>
              <strong>Frameworks: </strong>Django, Flask, and React
            </p>
            <p>
              <strong>Misc: </strong>Azure Fundamentals, Linux, VSCode, Docker
            </p>

            <h2>
              <strong>Github Stats</strong>
            </h2>
            <hr />
            <a href="https://github.com/varunkmr19/">
              <img
                height="137px"
                alt="github profile summary"
                src="https://github-readme-stats.vercel.app/api?username=varunkmr19&hide_title=true&hide_border=true&show_icons=true&include_all_commits=true&count_private=true&line_height=21&text_color=000&icon_color=000&bg_color=0,ea6161,ffc64d,fffc4d,52fa5a&theme=graywhite"
              />
              <img
                height="137px"
                alt="github repo used languages"
                src="https://github-readme-stats.vercel.app/api/top-langs/?username=varunkmr19&hide=html&hide_title=true&hide_border=true&layout=compact&langs_count=7&exclude_repo=comp426,Redventures-Movie-Quotes&text_color=000&icon_color=fff&bg_color=0,52fa5a,4dfcff,c64dff&theme=graywhite"
              />
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
