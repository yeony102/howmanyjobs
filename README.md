# HOW MANY JOBS

This website shows the number of job openings in the US, and the number of particular jobs that ITP, NYU students are most interested in. 
[Demo](http://yhl438.itp.io:3000/#t1)

### Data
I collected the job opening data from [Glassdoor](https://www.glassdoor.com/index.htm) in 2018 using [Selenium](https://en.wikipedia.org/wiki/Selenium_(software)) + Python and saved it as json files.

### Visualization
**In the US**
* Shows the 10 most popular jobs in the US. 
* You can see the popular jobs in each state by clicking a state on the map on the left-side.
* The darker the state's color on the map is, the more job openings they have.

**For ITPers**
* Shows the number of the openings for the following jobs in the US and in each state. They are 3 most popular jobs for ITP students.
  * Multimedia Designer
  * Software Developer
  * UX Designer
* You can see the job opening status in each state by clicking a state on the map on the right-side.
* The less opaque a state's color on the map is, the more opening positions for the job they have.

I did all data visualazation with vanila javascript.

