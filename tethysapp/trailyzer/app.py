from tethys_sdk.base import TethysAppBase, url_map_maker


class TrailAnalyzer(TethysAppBase):
    """
    Tethys app class for Trail Analyzer.
    """

    name = 'Trail Analyzer'
    index = 'trailyzer:home'
    icon = 'trailyzer/images/Bike.ico'
    package = 'trailyzer'
    root_url = 'trailyzer'
    color = '#1abc9c'
    description = 'Use Web Processing Services to display an elevation profile. It may be used anywhere in the world.'
    enable_feedback = False
    feedback_emails = []

        
    def url_maps(self):
        """
        Add controllers
        """
        UrlMap = url_map_maker(self.root_url)

        url_maps = (UrlMap(name='home',
                           url='trailyzer',
                           controller='trailyzer.controllers.home'),
                    UrlMap(name='Example',
                            url='Example',
                            controller='trailyzer.controllers.Example'),
                    UrlMap(name='ExampleA',
                            url='ExampleA',
                            controller='trailyzer.controllers.ExampleA'),
                    UrlMap(name='EndUser',
                            url='EndUser',
                            controller='trailyzer.controllers.EndUser'),
                    UrlMap(name='TechnicalSpecs',
                            url='TechnicalSpecs',
                            controller='trailyzer.controllers.TechnicalSpecs'),

        )

        return url_maps