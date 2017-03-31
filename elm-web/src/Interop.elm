port module Interop exposing (..)

import Types exposing (..)


port updateLocation : Location -> Cmd msg


port pathUpdated : (String -> msg) -> Sub msg


port updateTitle : String -> Cmd msg