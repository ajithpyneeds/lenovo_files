## Git and GitHub

- Git is created by Linus Torvald.
- Git is a **Distributed Version Control System**.

### Creating a Repository in GitHub

- GitHub >>> Repositories - New[python] >>> public >>> create repository......
- copy the ssh displayed on the github.
- Terminal >>> 
- cd Desktop >>>
- mkdir [directory name(python)] >>> 
- cd python >>> 
- echo "# string" >> README.md
- git init >>>
- git add .
- git commit -m "python is easy to learn"
- git remote add origin http://(copied URL must be paste here)
- git push -u origin master >>> user name >>> password...
- Now click on the repository you created. Master branch has been created and README.md will be committed inside it.

### Team Workflow

Let us consider a team of 5 members working for a project called 'ABC'.  Now we have 5 repositories for each and one of the repository will be the **MASTER**, rest of the team has to work under the master by creating branch in the main repos

- Search Box >>> Master repository >>> FORK >>> Clone >>> copy the URL
- Terminal >>> mkdir [File name] >>> 