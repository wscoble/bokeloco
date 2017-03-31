module Style exposing (..)

import Css exposing (..)
import Css.Elements exposing (..)
import Css.Namespace exposing (..)
import Html.CssHelpers exposing (..)


type CssClasses
    = Active
    | Inactive
    | Clickable
    | NavButton
    | LogoWrapper
    | NavigationWrapper


type CssIds
    = Page


css : Stylesheet
css =
    (stylesheet << namespace "bokeloco")
        [ body
            [ margin (px 0)
            , padding (px 0)
            , backgroundColor (hex "F1F1F1")
            ]
        , class LogoWrapper
            [ backgroundColor (hex "93846e")
            , height (px 54)
            , textAlign center
            , padding2 (px 20) (px 0)
            ]
        , class NavigationWrapper
            [ backgroundColor (hex "675a48")
            , textAlign center
            ]
        , class Clickable
            [ cursor pointer
            ]
        , class NavButton
            [ color (hex "ffffff")
            , display inlineBlock
            , margin2 (px 0) (px 10)
            , padding2 (px 0) (px 20)
            , height (px 36)
            , lineHeight (px 36)
            , backgroundColor (rgba 0 0 0 0)
            , borderColor (rgba 0 0 0 0)
            , fontSize (px 16)
            , fontFamilies [ "Roboto", "Arial" ]
            , withClass Active
                [ color (hex "f9ed1f")
                ]
            , hover
                [ backgroundColor (rgba 0 0 0 0.2) ]
            ]
        ]


stylesNamespace : Namespace String class id msg
stylesNamespace =
    withNamespace "bokeloco"
