function userMappedforMahasiswa({ data, req }) {
  let mappedUser;

  data.forEach((item) => {
    if (!mappedUser) {
      mappedUser = {
        id: item.id,
        name: item.name,
        email: item.email,
        category: item.category,
        profile: `http://${req.headers.host}/${item.profile}`,
        works: [],
      };
    }

    if (item.work_id) {
      mappedUser.works.push({
        id: item.work_id,
        title: item.work_title,
        content: item.work_content,
        image: `http://${req.headers.host}/${item.work_image}`,
      });
    }
  });

  return mappedUser;
}

function userMappedforUMKM({ data, req }) {
  let mappedUser;

  data.forEach((item) => {
    if (!mappedUser) {
      mappedUser = {
        id: item.id,
        name: item.name,
        email: item.email,
        category: item.category,
        profile: `http://${req.headers.host}/${item.profile}`,
        jobs: [],
      };
    }

    if (item.job_id) {
      mappedUser.jobs.push({
        id: item.job_id,
        title: item.job_title,
        content: item.job_content,
      });
    }
  });

  return mappedUser;
}

module.exports = { userMappedforMahasiswa, userMappedforUMKM };
