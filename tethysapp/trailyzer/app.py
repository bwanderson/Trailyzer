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
    description = 'This app uses Web Processing Services to give a trails elevation profile.'
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
                    (UrlMap(name='Example',
                            url='Example',
                            controller='trailyzer.controllers.Example')
                     )
        )

        return url_maps