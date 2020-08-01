from drf_user.models import User


def is_centre_user(user: User) -> bool:
    """
    To Check if user is from centre department
    Parameters
    ----------
    user
    Returns
    -------
    True
        If user is from centre department
    False
        If user is not from centre department
    """
    try:
        is_centre_user = user.centredepartment
    except User.centredepartment.RelatedObjectDoesNotExist:
        is_centre_user = False
    return bool(is_centre_user)


def is_state_user(user: User) -> bool:
    """
    To Check if user is from state department
    Parameters
    ----------
    user
    Returns
    -------
    True
        If user is from centre department
    False
        If user is not from centre department
    """
    try:
        is_state_user = user.statedepartment
    except User.statedepartment.RelatedObjectDoesNotExist:
        is_state_user = False
    return bool(is_state_user)
