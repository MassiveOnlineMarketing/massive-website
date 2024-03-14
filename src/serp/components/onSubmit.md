  const onSubmit = async (data: Schema) => {
    setOpen(false)

    if (!projectDetails) {
      return
    }
    const result = await addKeywordToProject(projectDetails.id, data.keywords, projectDetails.language, projectDetails.country, projectDetails.domainUrl)
    // console.log('result', result)

    if (result) {
      toast({
        title: result.success,
        variant: 'success',
        duration: 2000
      })
      reset()

      const keywordIds = result.userResults.map((keyword) => keyword.keywordId)
      addKeywords(keywordIds)
    } else {
      toast({
        title: 'Error adding keywords',
        variant: 'destructive',
        duration: 2000
      })
    }
  }